package totp

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha1"
	"encoding/base32"
	"encoding/binary"
	"fmt"
	"math"
	"time"
)

// GenerateSecret creates a new random base32 encoded secret for TOTP
func GenerateSecret() (string, error) {
	secret := make([]byte, 20)
	if _, err := rand.Read(secret); err != nil {
		return "", err
	}
	return base32.StdEncoding.WithPadding(base32.NoPadding).EncodeToString(secret), nil
}

// ValidateCode verifies a TOTP code against a secret
func ValidateCode(secret string, code string) bool {
	key, err := base32.StdEncoding.WithPadding(base32.NoPadding).DecodeString(secret)
	if err != nil {
		return false
	}

	// Hotp logic
	counter := uint64(time.Now().Unix() / 30)
	
	// Check current, previous and next window for clock skew
	for i := -1; i <= 1; i++ {
		if generateHOTP(key, uint64(int64(counter)+int64(i))) == code {
			return true
		}
	}

	return false
}

func generateHOTP(key []byte, counter uint64) string {
	buf := make([]byte, 8)
	binary.BigEndian.PutUint64(buf, counter)

	h := hmac.New(sha1.New, key)
	h.Write(buf)
	sum := h.Sum(nil)

	offset := sum[len(sum)-1] & 0xf
	binCode := int64(sum[offset]&0x7f)<<24 |
		int64(sum[offset+1]&0xff)<<16 |
		int64(sum[offset+2]&0xff)<<8 |
		int64(sum[offset+3]&0xff)

	otp := int32(binCode % int64(math.Pow10(6)))
	return fmt.Sprintf("%06d", otp)
}
