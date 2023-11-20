const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === '.' || e.key === ',' || e.key === '+') {
        e.preventDefault();
        setValue('');
    }
};

export default handleKeyDown