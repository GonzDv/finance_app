// src/components/Skeleton.jsx
const Skeleton = ({ className }) => (
    <div className={`bg-zinc-800/40 animate-pulse rounded-xl ${className}`} />
);

export default Skeleton;