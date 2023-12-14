import { useEffect, useState } from 'react';

function useRenderEffect(text) {

    const [displayText, setDisplayText] = useState('');

    useEffect(() => {

        let i = -1;

        const intervalId = setInterval(() => {

            if (i < text.length) {

                i++;

                setDisplayText((prevText) => prevText + text.charAt(i));

            } else {
                clearInterval(intervalId);

            }

        }, 30);

        return () => clearInterval(intervalId);

    }, [text]);

    return displayText;
}

export default useRenderEffect;
