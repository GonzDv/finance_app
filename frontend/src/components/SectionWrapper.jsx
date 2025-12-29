function SectionWrapper({ children, className = "" }) {
    return (
        <div className={`${className} bg-[#1E1E1E] text-white  p-6 rounded-2xl border border-gray-800 shadow-xl`}>
            {children}
        </div>

    )
}
export default SectionWrapper;