# Email Preferences System

## Overview

OpenQase's email preferences system follows industry best practices for managing user email subscriptions, specifically adhering to [Resend's official recommendations](https://resend.com/docs/knowledge-base/how-do-i-avoid-gmails-spam-folder) for separating transactional and marketing emails.

## Problem Solved

### Original Issue
The initial email preferences implementation had several problems:
- **Security emails toggle** - Allowed users to disable transactional emails (violates best practices)
- **Database RLS policy issues** - INSERT policy missing for `user_preferences` table
- **Duplicate systems** - Separate email preferences conflicted with existing newsletter system
- **Poor user experience** - Error-prone toggles that failed to save preferences

### Industry Requirements
According to Resend and email industry standards:
- **Transactional emails** (security, password resets, receipts) should NEVER be toggleable
- **Marketing emails** should connect to newsletter subscription systems
- **CAN-SPAM compliance** requires easy unsubscribe for marketing emails
- **Clear separation** between email types improves deliverability

## Solution Architecture

### Email Type Separation

```
┌─────────────────────┬────────────────────┬──────────────────┐
│ Email Type          │ User Control       │ System           │
├─────────────────────┼────────────────────┼──────────────────┤
│ Security & Account  │ None (always sent) │ Transactional    │
│ Password Resets     │ None (always sent) │ Transactional    │
│ Login Notifications │ None (always sent) │ Transactional    │
│ Marketing Newsletter│ Subscribe/Unsubscr │ newsletter_subscr│
│ Product Updates     │ Subscribe/Unsubscr │ newsletter_subscr│
└─────────────────────┴────────────────────┴──────────────────┘
```

### Technical Flow

```
Profile Page → Newsletter API → newsletter_subscriptions table
     ↓               ↓                    ↓
User toggles → Authenticates user → Updates subscription
marketing    → Validates request  → (active/unsubscribed)
emails       → Updates database   → Returns status
```

## Implementation Details

### API Endpoints

#### `GET /api/newsletter/subscription`
**Purpose**: Get current user's newsletter subscription status

**Authentication**: Required (Bearer token)

**Response**:
```json
{
  "email": "user@example.com",
  "isSubscribed": true,
  "status": "active"
}
```

**Status Values**:
- `active` - User is subscribed
- `unsubscribed` - User has unsubscribed
- `not_subscribed` - No subscription record exists

#### `POST /api/newsletter/subscription`
**Purpose**: Subscribe or unsubscribe user from newsletter

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "subscribe": true
}
```

**Response** (Subscribe):
```json
{
  "message": "Successfully subscribed to newsletter",
  "isSubscribed": true
}
```

**Response** (Unsubscribe):
```json
{
  "message": "Successfully unsubscribed from newsletter", 
  "isSubscribed": false
}
```

### Database Schema

Uses existing `newsletter_subscriptions` table:

```sql
-- newsletter_subscriptions table structure
{
  id: uuid,
  email: string,
  status: 'active' | 'unsubscribed',
  subscription_date: timestamp,
  updated_at: timestamp,
  metadata: jsonb
}
```

### Frontend Implementation

#### Profile Page (`src/app/profile/page.tsx`)

**Key Features**:
- Single marketing emails toggle
- Clear explanation of security emails
- Loading states during API calls
- Error handling with user feedback
- Automatic status loading on page load

**State Management**:
```typescript
const [marketingEmailsEnabled, setMarketingEmailsEnabled] = useState(false)
const [newsletterLoading, setNewsletterLoading] = useState(false)
```

**Toggle Handler**:
```typescript
const handleMarketingEmailsToggle = async (enabled: boolean) => {
  // API call to /api/newsletter/subscription
  // Updates local state and shows feedback
}
```

## User Experience

### Email Preferences Section

```
┌─────────────────────────────────────────────────────────┐
│ Email Preferences                                       │
│ Manage your newsletter subscription. Security and      │
│ account emails will always be sent.                    │
│                                                         │
│ ┌─────────────────────────────────────────┐ [Toggle]  │
│ │ Marketing emails                        │     ON     │
│ │ Receive our newsletter with updates     │            │
│ │ about quantum computing case studies... │            │
│ └─────────────────────────────────────────┘            │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🛡️ Security & Account Emails                       │ │
│ │ Important emails about your account security,       │ │
│ │ password resets, and login notifications will      │ │
│ │ always be sent and cannot be disabled.             │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Key UX Improvements

1. **Clear Communication**: Users understand what each setting controls
2. **No Confusion**: Security emails clearly marked as non-toggleable
3. **Professional Design**: Clean, informative interface
4. **Immediate Feedback**: Loading states and success/error messages
5. **Accessibility**: Proper labels and ARIA attributes

## Benefits of This Approach

### ✅ Compliance & Best Practices
- **CAN-SPAM compliant** - Clear unsubscribe for marketing emails
- **Resend recommended** - Follows official best practices
- **Industry standard** - Matches email provider expectations
- **Legal protection** - Transactional emails always sent

### ✅ Technical Excellence  
- **Uses existing infrastructure** - Newsletter system already proven
- **No duplicate systems** - Single source of truth
- **Proper authentication** - Secure user management
- **Error handling** - Graceful failure modes

### ✅ Improved Deliverability
- **Better inbox placement** - Clear email type separation
- **Reduced spam complaints** - Easy marketing unsubscribe
- **Enhanced reputation** - Follows email best practices
- **Provider trust** - Meets Gmail/Outlook expectations

## Testing Instructions

### Manual Testing

1. **Access Profile Page**:
   ```
   http://localhost:3004/profile
   ```

2. **Test Marketing Toggle**:
   - Toggle ON → Should subscribe to newsletter
   - Toggle OFF → Should unsubscribe from newsletter
   - Check loading states and feedback messages

3. **Verify Database**:
   ```sql
   SELECT * FROM newsletter_subscriptions 
   WHERE email = 'your-test-email@example.com';
   ```

4. **Test Error Scenarios**:
   - Logout and try to access → Should redirect to login
   - Network failure → Should show error message
   - Invalid data → Should handle gracefully

### Automated Testing

```bash
# Run build to verify no TypeScript errors
npm run build

# Test API endpoints (if you have test suite)
npm test -- email-preferences
```

### Browser Developer Tools

1. **Network Tab**: Verify API calls to `/api/newsletter/subscription`
2. **Console**: Check for JavaScript errors
3. **Application Tab**: Verify authentication state

## Migration Notes

### What Changed
- **Removed**: Security emails toggle (was in `user_preferences.email_preferences`)
- **Added**: New newsletter subscription API endpoint
- **Updated**: Profile page UI and logic
- **Cleaned**: Removed unused database migration files

### Backward Compatibility
- **No breaking changes** - Existing newsletter system unchanged
- **Safe migration** - New API endpoints are additive
- **Graceful fallback** - Handles users without subscription records

## Future Enhancements

### Potential Improvements
1. **Email Categories**: Add more granular newsletter categories (product updates, research, etc.)
2. **Frequency Control**: Allow users to choose email frequency
3. **Preference Center**: Dedicated page with advanced options
4. **A/B Testing**: Test different messaging for better conversion

### Integration Opportunities  
1. **Welcome Emails**: Auto-subscribe during account creation
2. **Onboarding**: Guide users through email preferences
3. **Analytics**: Track subscription/unsubscription rates
4. **Segmentation**: Target based on user preferences

## Troubleshooting

### Common Issues

**Toggle doesn't work**:
- Check browser console for errors
- Verify user is authenticated
- Check network requests in DevTools

**Database not updating**:
- Verify Supabase connection
- Check RLS policies on `newsletter_subscriptions`
- Review server logs for errors

**Status not loading**:
- Check API endpoint response
- Verify user has valid session
- Review authentication logic

### Support Commands

```bash
# Check Supabase status
supabase status

# View server logs
npm run dev

# Test API directly
curl -X GET http://localhost:3004/api/newsletter/subscription \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Related Documentation

- [Newsletter System](./newsletter-system.md)
- [Authentication](./authentication.md)
- [API Documentation](./api-documentation.md)

---

**Last Updated**: January 2025
**Version**: 1.0
**Author**: OpenQase Team 