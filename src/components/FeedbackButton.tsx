'use client';

export function FeedbackButton() {
  const handleFeedbackOpen = () => {
    window.open('https://tally.so/r/wap82b', '_blank', 'width=700,height=800,scrollbars=yes,resizable=yes');
  };

  return (
    <button 
      onClick={handleFeedbackOpen}
      className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
    >
      Share Feedback
    </button>
  );
}