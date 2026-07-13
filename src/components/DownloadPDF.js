import React from "react";
import '../styles/ButtonStyles.css';

export const DownloadPDF = () => {

    const onButtonClick = () => {
        const pdfUrl = `${process.env.PUBLIC_URL}/Evelyn Brannen Computer Science Resume 2026.pdf`;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Evelyn Brannen Computer Science Resume 2026.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button onClick={onButtonClick} className="button-minimal">
            Download Resume
            <i className="bi bi-download"></i>
        </button>
    );
};
