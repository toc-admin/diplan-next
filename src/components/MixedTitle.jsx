const MixedTitle = ({ text, stil, number }) => {
    if (!text) return null;
  
    const words = text.split(" ");
    return (
      <h2 className={stil}>
        {words.map((word, index) => {
          if (index === number) {
            // second word italic
            return (
              <span key={index} className="italic">
                {word}{" "}
              </span>
            );
          }
          return word + " ";
        })}
      </h2>
    );
  };

  export default MixedTitle;
  