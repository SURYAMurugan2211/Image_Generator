import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import FormData from 'form-data';

dotenv.config();

const router = express.Router();
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

router.get('/', (req, res) => res.send('Hello from Stability AI Image Generator'));

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;

        // Create FormData object
        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("output_format", "jpeg");

        // Send request with correct headers
        const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STABILITY_API_KEY}`,
                'Accept': 'application/json', // Explicitly accept JSON response
                ...formData.getHeaders()
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read error response
            throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        const image = data?.image;

        if (!image) throw new Error("No image data received from Stability AI API");

        res.status(200).json({ photo: image });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
