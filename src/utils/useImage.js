import { useEffect, useState } from "react";

const useImage = (fileName) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../assets/png/${fileName}`); // change relative path to suit your needs
        setImage(response.default);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    fetchImage();
  }, [fileName]);

  return image;
};

export default useImage;
