import type { Metadata } from "next";
import "./globals.css";
import AppBar from "./ui/app-bar";
import AppWrapper from "../context/app-wrapper";

export const metadata: Metadata = {
    title: "TI:Legacy Tool Assistant",
    description: "This website assist user with tooling items from the MUD the Inquisition: Legacy.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`font-mono antialiased overflow-scroll`}>
                <AppWrapper>
                    <AppBar/>
                    <div className="flex justify-center  min-w-full  min-h-full">
                        {children}
                    </div>
                </AppWrapper>            
            </body>
        </html>
    );
}
