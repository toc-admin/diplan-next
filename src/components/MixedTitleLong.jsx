const MixedTitleLong = ({ text, stil }) => {
    if (!text) return null;
  
    const words = text.split(" ");
    return (
      <h1 className={stil}>
        {words.map((word, index) => {
          if (index === 2 || index === 3) {
            // second word italic
            return (
              <span key={index} className="italic font-normal">
                {word}{" "}
              </span>
            );
          }
          return word + " ";
        })}
      </h1>
    );
  };

  export default MixedTitleLong;
  