// Utility function to format the date and time from ISO string
const formatDateAndTime = (isoString: string) => {
    const dateObj = new Date(isoString)
    // Extract day, month, and year
    const day = dateObj.getDate().toString().padStart(2, '0'); // Pad single digit day with leading zero
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Pad single digit month with leading zero
    const year = dateObj.getFullYear();

    // Format date as DD-MM-YYYY
    const date = `${day}-${month}-${year}`;

    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Formats time in "HH:MM" format
    return { date, time }
}

export default formatDateAndTime