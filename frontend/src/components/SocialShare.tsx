import { Facebook, Twitter } from "@mui/icons-material";

interface EventDetailProps {
    ticketUrl: string;
}

const SocialShare = ({ticketUrl} : EventDetailProps) => {

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ticketUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const tweetText = "Check out this event on Ticketmaster!";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(ticketUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
        <div className="text-lg">
            Share on:
        </div>
      <button 
        onClick={shareOnFacebook} 
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        aria-label="Share on Facebook"
      >
        <Facebook fontSize="medium" />
      </button>

      <button 
        onClick={shareOnTwitter} 
        className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
        aria-label="Share on Twitter"
      >
        <Twitter fontSize="medium" />
      </button>
    </div>
  );
};

export default SocialShare;
