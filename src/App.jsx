import { useState } from 'react';
import {
    num2Arabic,
    num2Bangla,
    num2Chinese,
    num2English,
    num2Hindi,
    num2Japanese,
    num2Portuguese,
    num2Russian,
    num2Spanish,
    num2Urdu
} from 'num2talk';
import LanguageSelector from './components/LanguageSelector';
import NumberInput from './components/NumberInput';
import OutputDisplay from './components/OutputDisplay';
import EmailPopup from './components/EmailPopup';
import Canvas from './components/Canvas';
import Documentation from './components/Doc';
import './App.css';

const languageMap = {
    English: num2English,
    Hindi: num2Hindi,
    Japanese: num2Japanese,
    Portuguese: num2Portuguese,
    Russian: num2Russian,
    Spanish: num2Spanish,
    Urdu: num2Urdu,
    Arabic: num2Arabic,
    Bangla: num2Bangla,
    Chinese: num2Chinese,
};

const App = () => {
    const [number, setNumber] = useState('');
    const [language, setLanguage] = useState('English');
    const [output, setOutput] = useState('');
    const [email, setEmail] = useState('');
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [copyMessage, setCopyMessage] = useState(''); // New state for copy message

    const handleConvert = () => {
        const convertFunc = languageMap[language];
        const result = convertFunc(parseInt(number, 10));
        setOutput(result);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopyMessage('Copied to clipboard!'); // Set the copy message
        setTimeout(() => setCopyMessage(''), 2000); // Clear the message after 2 seconds
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        const subject = 'Shared Number Conversion';
        const body = `I converted the number ${number} to ${language}: ${output}`;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const handleSaveImage = () => {
        const canvas = document.querySelector('canvas');
        const link = document.createElement('a');
        link.download = 'number-conversion.png'; 
        link.href = canvas.toDataURL(); 
        link.click(); 
    };

    return (
        <div>
            <div className="app-wrapper">
                <div className="app-container">
                    <h1 className="app-title">Multilingual Number Converter</h1>
                    <div className="converter">
                        <LanguageSelector language={language} setLanguage={setLanguage} languageMap={languageMap} />
                        <NumberInput number={number} setNumber={setNumber} />
                        <button className="convert-button" onClick={handleConvert}>Convert</button>
                    </div>
                    {output && (
                        <div className="">
                            <OutputDisplay 
                                number={number} 
                                output={output} 
                                handleCopy={handleCopy} 
                                handlePrint={handlePrint} 
                                handleSaveImage={handleSaveImage} 
                                setShowEmailPopup={setShowEmailPopup}
                            />
                            <Canvas number={number} result={output} />
                            {copyMessage && <div className="copy-message">{copyMessage}</div>} {/* Display copy message */}
                        </div>
                    )}
                    {showEmailPopup && (
                        <EmailPopup 
                            email={email} 
                            setEmail={setEmail} 
                            handleShare={handleShare} 
                            setShowEmailPopup={setShowEmailPopup} 
                        />
                    )}
                </div>
            </div>
            <div>
                <Documentation />
            </div>
        </div>
    );
};

export default App;
