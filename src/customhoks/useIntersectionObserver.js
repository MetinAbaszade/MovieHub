
    import { useEffect, useState } from 'react';

    const useIntersectionObserver = (ref, options) => {
        const [isIntersecting, setIntersecting] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(([entry]) => {
                setIntersecting(entry.isIntersecting);
            }, options);

            const currentRef = ref.current;

            if (currentRef) {
                observer.observe(currentRef);
            }

            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
            };
        }, [ref, options]);

        return isIntersecting;
    };

    export default useIntersectionObserver;
