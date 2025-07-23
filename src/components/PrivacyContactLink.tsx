'use client';

export function PrivacyContactLink() {
  const handleContactOpen = () => {
    window.open('https://tally.so/r/wap82b', '_blank', 'width=700,height=800,scrollbars=yes,resizable=yes');
  };

  return (
    <button 
      onClick={handleContactOpen}
      className="text-primary hover:text-primary/80 underline cursor-pointer"
    >
      this form
    </button>
  );
}