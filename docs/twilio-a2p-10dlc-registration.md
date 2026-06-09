# Twilio A2P 10DLC Registration Content

Business: HVAC Service & AC Repair
Address: 18340 Yorba Linda Blvd #107, Yorba Linda, CA 92886
Phone: (714) 410-2784
Email: info@hvacserviceacrepair.com
Website: https://www.hvacserviceacrepair.com/

---

## Campaign Description

HVAC Service & AC Repair sends service-related SMS messages to customers and prospective
customers who submit an HVAC service request through our website or contact us directly.
Messages are used for appointment scheduling, confirmations, reminders, technician arrival
updates, service follow-ups, and customer care related to AC repair, heating repair, HVAC
maintenance, installation, and emergency HVAC service.

---

## Message Flow

End users opt in by visiting https://www.hvacserviceacrepair.com/ or related service/contact
pages and submitting a service request form. The form asks for the user's name, phone number,
service needed, service address, and optional details. Near the phone number field and before
submission, users see an optional unchecked SMS consent checkbox. The checkbox states that
they agree to receive SMS text messages from HVAC Service & AC Repair about their HVAC
service request, appointment scheduling, confirmations, reminders, and service follow-ups.
The disclosure includes message frequency, message and data rates, STOP opt-out instructions,
HELP instructions, and states that consent is not a condition of purchase. Users can submit
the form without checking the SMS consent box.

Privacy Policy: https://www.hvacserviceacrepair.com/privacy-policy
Terms of Service: https://www.hvacserviceacrepair.com/terms
SMS Compliance Page: https://www.hvacserviceacrepair.com/sms-compliance

---

## Sample Messages

1. HVAC Service & AC Repair: Thanks for requesting HVAC service. We received your request for [service type] and will contact you shortly to confirm availability. Reply STOP to opt out.
2. HVAC Service & AC Repair: Your HVAC appointment is confirmed for [date] between [time window]. Reply HELP for help or STOP to unsubscribe.
3. HVAC Service & AC Repair: Our technician is on the way to [service address/city]. Please make sure the HVAC equipment is accessible. Reply STOP to opt out.
4. HVAC Service & AC Repair: Thank you for choosing us. Your service visit is complete. Contact us at (714) 410-2784 if you have questions. Reply STOP to opt out.
5. HVAC Service & AC Repair: Reminder: your scheduled HVAC service is tomorrow at [time]. Reply HELP for help or STOP to unsubscribe.

---

## Keywords

**Opt-In Keywords:** START, YES

**Opt-Out Keywords:** STOP, UNSUBSCRIBE, CANCEL, END, QUIT

**Help Keywords:** HELP, INFO

---

## Standard Responses

**Opt-In Message:**
HVAC Service & AC Repair: You are subscribed to service-related SMS updates. Msg frequency varies, up to 4/mo. Msg & data rates may apply. Reply HELP for help, STOP to opt out.

**Opt-Out Message:**
HVAC Service & AC Repair: You have been unsubscribed and will no longer receive SMS messages from us. Reply START to resubscribe.

**Help Message:**
HVAC Service & AC Repair: For help, call (714) 410-2784 or email info@hvacserviceacrepair.com. Reply STOP to opt out.

---

## Consent Text Shown to Users

Version: 2026-06-a2p-10dlc-v1

> I agree to receive SMS text messages from HVAC Service & AC Repair about my HVAC service
> request, appointment scheduling, confirmations, reminders, and service follow-ups. Message
> frequency varies, up to 4 messages per month. Message and data rates may apply. Reply STOP
> to unsubscribe and HELP for help. Consent is not a condition of purchase. View our Privacy
> Policy and Terms of Service.

---

## QA Checklist

- [x] SMS consent checkbox present on all phone-number forms
- [x] SMS consent checkbox is NOT pre-checked
- [x] SMS consent is optional — form submits without it
- [x] SMS consent is separate from Privacy Policy / Terms acceptance
- [x] Disclosure appears directly above submit button
- [x] Disclosure includes business name, message types, frequency, rates, STOP, HELP, consent-not-required
- [x] Links to /privacy-policy and /terms in disclosure
- [x] Privacy Policy includes mobile non-sharing language
- [x] Privacy Policy includes SMS opt-out instructions
- [x] Terms of Service includes SMS Terms section
- [x] Terms of Service robots: index: true (was index: false — fixed)
- [x] Footer has Privacy Policy and Terms links
- [x] /privacy-policy returns 200
- [x] /terms returns 200
- [x] /sms-compliance returns 200
- [x] API route records smsConsent, smsConsentVersion, submittedAt
- [x] Email notification shows SMS Consent: Yes/No
