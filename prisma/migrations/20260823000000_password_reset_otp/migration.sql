-- Six-digit reset codes are stored as email tokens too, but must never be
-- accepted where the long emailed reset token is expected.
ALTER TYPE "email_token_type" ADD VALUE IF NOT EXISTS 'PASSWORD_RESET_OTP';
