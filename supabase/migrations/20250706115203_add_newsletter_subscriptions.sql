-- Create newsletter_subscriptions table
create table "public"."newsletter_subscriptions" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    subscription_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribe_token VARCHAR(255) UNIQUE DEFAULT gen_random_uuid(),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);
CREATE INDEX idx_newsletter_date ON newsletter_subscriptions(subscription_date);
CREATE INDEX idx_newsletter_unsubscribe_token ON newsletter_subscriptions(unsubscribe_token);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for newsletter_subscriptions
create policy "Enable read access for all users" ON newsletter_subscriptions
    FOR SELECT USING (true);

create policy "Enable insert for all users" ON newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

create policy "Enable update for admins only" ON newsletter_subscriptions
    FOR UPDATE USING (
        auth.jwt() ->> 'role' = 'admin'
    );

create policy "Enable delete for admins only" ON newsletter_subscriptions
    FOR DELETE USING (
        auth.jwt() ->> 'role' = 'admin'
    );

-- Add trigger for newsletter_subscriptions
CREATE TRIGGER update_newsletter_subscriptions_updated_at 
    BEFORE UPDATE ON public.newsletter_subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

