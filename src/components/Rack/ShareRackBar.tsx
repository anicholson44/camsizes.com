import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import copy from "copy-to-clipboard";

const ShareRackBar = ({ shareUrl }: { shareUrl: string }) => {
  const [flashCopiedMessage, setFlashCopiedMessage] = useState(false);

  return (
    <div>
      <div
        className={flashCopiedMessage ? "visible" : "hidden"}
        style={{
          position: "absolute",
          top: -34,
          border: "1px solid rgba(0,0,0,.4)",
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "white",
          padding: 4
        }}
      >
        Copied to clipboard <Icon name="checkmark" color="green" />
      </div>
      <a
        title="Share on Twitter"
        href={`https://twitter.com/intent/tweet?text=${encodeURI(
          "Check out my rack on camsizes.com!\n"
        )}&url=${encodeURI(shareUrl)}`}
        target="_blank"
      >
        <Icon name="twitter" size="large" />
      </a>
      <a
        title="Share on Facebook"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
          shareUrl
        )}`}
        target="_blank"
      >
        <Icon name="facebook" size="large" />
      </a>
      <a
        title="Copy link to clipboard"
        onClick={() => {
          copy(shareUrl);
          setFlashCopiedMessage(true);
          setTimeout(() => setFlashCopiedMessage(false), 2000);
        }}
      >
        <Icon name="copy outline" size="large" />
      </a>
    </div>
  );
};

export default ShareRackBar;
