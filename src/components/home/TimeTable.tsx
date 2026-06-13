"use client";
import { useEffect, useState } from "react";
import { DocumentUpload, NoteRemove } from "iconsax-react";

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0]?.match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]!);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

const TimeTableBlock = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [defaultSrc, setDefaultSrc] = useState<string | null>(null); 
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const type = localStorage.getItem("timetableType");

    if (type === "image") {
      const imageData = localStorage.getItem("timetableImage");
      if (imageData) {
        const file = dataURLtoFile(imageData, "saved-image.png");
        setUploadedFile(file);
      }
    }

    if (type === "pdf") {
      const pdfData = localStorage.getItem("timetablePDF");
      if (pdfData) {
        const file = dataURLtoFile(pdfData, "saved-timetable.pdf");
        setUploadedFile(file);
      }
    }

    const candidates = [
      "/table table.jpg",
      "/table table.jpeg",
      "/table table.png",
      "/table table.pdf",
    ];
    (async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok) {
            setDefaultSrc(url);
            break;
          }
        } catch (e) {
          // ignore
        }
      }
    })();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      if (file.type.startsWith("image")) {
        setUploadedFile(file);

        localStorage.setItem("timetableType", "image");
        localStorage.setItem("timetableImage", base64);
      } else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setUploadedFile(file);
        localStorage.setItem("timetableType", "pdf");
        localStorage.setItem("timetablePDF", base64);
      }
    };

    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className="border border-[var(--text)] rounded-lg p-4 h-96 flex flex-col"
        data-testid="timetable-block"
      >
        {/* Header */}
        <div className="relative flex-shrink-0 flex justify-between items-center">
          <div className="relative flex items-center">
            <img
              className="absolute h-16 z-10"
              src="/scribble-circle.svg"
              alt="Scribbled circle overlay"
            />
            <h2 className="ml-2 p-3 text-[2rem] font-medium text-[var(--text)] z-20">
              Time Table
            </h2>
          </div>

          {/* Upload Button with Icon */}
          <div className="flex items-center space-x-2 z-20 mr-2">
            {/* Upload Button */}
            {!uploadedFile && (
              <label className="flex items-center border border-[var(--text)] space-x-1 px-2 py-1 text-[var(--text)] rounded-lg cursor-pointer text-sm">
                <DocumentUpload size={18} color="black" variant="Bold" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Remove Button */}
            {uploadedFile && (
              <button
                onClick={() => {
                  setUploadedFile(null);
                  localStorage.removeItem("timetableImage");
                  localStorage.removeItem("timetablePDF");
                  localStorage.removeItem("timetableType");
                }}
                className="flex items-center border border-[var(--text)] space-x-1 px-2 py-1 text-[var(--text)] rounded-lg text-sm"
              >
                <NoteRemove size={18} color="black" variant="Bold" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto rounded-xl min-h-0 justify-center items-center flex px-2 py-1"
          onClick={uploadedFile || defaultSrc ? toggleExpand : undefined}
          style={{ cursor: uploadedFile || defaultSrc ? "pointer" : "default" }}
        >
          {uploadedFile?.type.startsWith("image/") && (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Uploaded timetable"
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
              />
            </div>
          )}

          {uploadedFile && uploadedFile.type === "application/pdf" && (
            <div className="w-full h-full flex items-center justify-center">
              <embed
                src={URL.createObjectURL(uploadedFile)}
                type="application/pdf"
                className="w-full h-full rounded"
              />
            </div>
          )}

          {!uploadedFile && defaultSrc && defaultSrc.endsWith(".pdf") && (
            <div className="w-full h-full flex items-center justify-center">
              <embed src={defaultSrc} type="application/pdf" className="w-full h-full rounded" />
            </div>
          )}

          {!uploadedFile && defaultSrc && !defaultSrc.endsWith(".pdf") && (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={defaultSrc} 
                alt="Default timetable" 
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
              />
            </div>
          )}

          {!uploadedFile && !defaultSrc && (
            <div className="text-sm text-[var(--text)] opacity-70">Upload a timetable image or PDF</div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal Preview */}
      {isExpanded && (uploadedFile || defaultSrc) && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={toggleExpand}
        >
          {/* Close button */}
          <button
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="
              absolute top-3 right-3
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-black/70 text-white
              backdrop-blur-sm
              shadow-lg
              transition-all
              hover:bg-black hover:scale-105
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-black/40
              sm:w-11 sm:h-11
            "
          >
            <span className="text-xl sm:text-2xl leading-none">×</span>
          </button>


          {/* Content */}
          <div className="w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            {uploadedFile?.type.startsWith("image/") && (
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img 
                  src={URL.createObjectURL(uploadedFile)} 
                  alt="Full timetable" 
                  className="w-full h-full object-cover"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    minWidth: '100%',
                    minHeight: '100%'
                  }}
                />
              </div>
            )}

            {uploadedFile && uploadedFile.type === "application/pdf" && (
              <embed src={URL.createObjectURL(uploadedFile)} type="application/pdf" className="w-full h-full" />
            )}

            {!uploadedFile && defaultSrc && !defaultSrc.endsWith(".pdf") && (
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img 
                  src={defaultSrc} 
                  alt="Full timetable" 
                  className="w-full h-full object-cover"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    minWidth: '100%',
                    minHeight: '100%'
                  }}
                />
              </div>
            )}

            {!uploadedFile && defaultSrc && defaultSrc.endsWith(".pdf") && (
              <embed src={defaultSrc} type="application/pdf" className="w-full h-full" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TimeTableBlock;
