import axios from "axios"
import { Buffer } from 'buffer';

export function formatDate(isoString: string) {
    const date = new Date(isoString)

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0') // Get day and pad with zero
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2) // Get last two digits of the year

    // Return formatted date
    return `${day}/${month}/${year}`
}

export function formatTime(isoString: string) {
    const date = new Date(isoString)

    let hours: string | number = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0') // Get minutes and pad with zero

    // Determine AM/PM and convert hours to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 // Convert to 12-hour format
    hours = hours ? String(hours).padStart(2, '0') : '12' // Convert 0 hour to 12

    // Return formatted time
    return `${hours}:${minutes} ${ampm}`
}

export async function modifyImage(imageURL: string) {
    console.log(imageURL, "< ---- imageURL here")
    try {
        // Fetch the image as an array buffer
        const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(response && response?.data, 'binary');

        // Convert to base64
        let base64Data = fileBuffer?.toString('base64');
        base64Data = base64Data.replace("dataimage/jpegbase64", '');
        // Construct the full data URL
        const dataURL = `data:image/png;base64,${base64Data}`;
        return dataURL;
    } catch (error) {
        console.error('Error processing the image:', error);
        return null;
    }
}