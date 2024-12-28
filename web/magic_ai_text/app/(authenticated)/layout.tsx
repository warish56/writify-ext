

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Stack } from "@mui/material"
import Script from "next/script"



type props = {
    children: React.ReactNode
}

export default function Layout({children}:props){
    return (
        <Stack>
            <Script   
                id="root_meta"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "AIMagicText",
                        "operatingSystem": "Windows, macOS, Linux",
                        "applicationCategory": "BrowserExtension",
                        "offers": {
                          "@type": "Offer",
                          "price": "0",
                          "priceCurrency": "INR"
                        },
                        "description": "Browser extension for AI-powered prompt search and text enhancement",
                        "aggregateRating": {
                          "@type": "AggregateRating",
                          "ratingValue": "4.5", // Add your actual rating
                          "ratingCount": "100"  // Add actual count
                        }
                      }),
                }}
            />
            <Navbar/>
            {children}
            <Footer/>
        </Stack>
    )
}