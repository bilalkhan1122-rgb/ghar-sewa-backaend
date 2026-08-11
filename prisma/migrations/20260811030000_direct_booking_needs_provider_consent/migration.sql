-- Booking a provider directly used to mark the job and booking ACCEPTED
-- immediately, so the app claimed the provider had agreed before they were even
-- asked. Direct bookings now start PENDING and wait for the provider.
ALTER TYPE "booking_status" ADD VALUE IF NOT EXISTS 'PENDING';
ALTER TYPE "notification_type" ADD VALUE IF NOT EXISTS 'BOOKING_REQUESTED';
