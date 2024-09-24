import { useState } from 'react'
function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false)

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 5000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <input className="text-muted" type="text" value={copyText} readOnly />
      {/* Bind our handler function to the onClick button property */}
      <button
        id="copy"
        style={{ marginLeft: '4px', width: '27px', height: '27px' }}
        onClick={handleCopyClick}
      >
        <span>
          {isCopied ? (
            <i className="ion-ios-copy"></i>
          ) : (
            <i className="ion-ios-copy-outline"></i>
          )}
        </span>
      </button>
    </div>
  )
}
export default ClipboardCopy
