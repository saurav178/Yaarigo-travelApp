
// IdentityVerificationComponent

// "use client";



// import React, { useState } from "react";
// import DocumentFields from "./DocumentFields";
// import { BsUpload } from "react-icons/bs";

// export default function IdentityVerification() {
//   const [docType, setDocType] = useState<string>("");
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [fields, setFields] = useState<Record<string, string>>({});

//   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const f = e.target.files?.[0] ?? null;
//     setFile(f);
//     if (f) setPreviewUrl(URL.createObjectURL(f));
//     else setPreviewUrl(null);
//   }

//   function handleDocTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     const type = e.target.value;
//     setDocType(type);
//     setFields({});
//   }

//   function handleFieldChange(name: string, value: string) {
//     setFields((s) => ({ ...s, [name]: value }));
//   }

//   function formatFileSize(bytes: number) {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
//   }

//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     // Replace with real upload logic
//     alert(`Submitting ${docType} with file: ${file?.name ?? "(no file)"}`);
//   }

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl">
//         <div className="flex items-center gap-4 mb-6">
//           <button className="flex items-center gap-2 cursor-pointer bg-transparent text-gray-700 hover:bg-[#E8F1F1] ml-10">
//             <span className="text-2xl">←</span>
//             <span className="hidden sm:inline">Back</span>
//           </button>
//           <div className="flex-1 mt-15">
//             <div className="h-3 rounded-full bg-[#E8F1F2]">
//               <div className="h-3 rounded-full bg-[#1d4350] w-1/3" />
//             </div>
//             <div className="text-xs text-gray-500 mt-1">Step 2 of 5</div>
//           </div>
//         </div>

//         <form onSubmit={onSubmit} className="bg-white rounded-lg p-4 md:p-8 shadow-sm">
//           <h2 className="text-lg font-semibold mb-1">Identity Verification</h2>
//           <p className="text-sm text-gray-500 mb-6">Verify your identity to ensure a safe community for all travelers</p>

//           <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Upload Government ID or Passport</label>

//               <div className="w-full rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center gap-4">
//                 <div className="w-full flex justify-center ">
//                   <span className="text-3xl"><BsUpload /></span>
//                   {/* <img src="/mnt/data/Screenshot (656).png" alt="illustration" className="hidden sm:block max-w-xs opacity-40" /> */}
//                 </div>

//                 <div className="text-center">
//                   <div className="mb-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3 3a1 1 0 011-1h6a1 1 0 110 2H5v12h10V9a1 1 0 112 0v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" clipRule="evenodd" />
//                       <path d="M7 7a1 1 0 012 0v3h3a1 1 0 110 2H9a1 1 0 01-1-1V7z" />
//                     </svg>
//                   </div>
//                   <div className="text-base font-medium">Upload Government ID or Passport</div>
//                   <div className="text-xs text-gray-400">Accepted formats: JPG, PNG, PDF (max 5MB)</div>

//                   <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
//                     <label className="cursor-pointer inline-flex items-center justify-center border  px-4 py-2 text-sm bg-white shadow-sm">
//                       <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
//                       Choose File
//                     </label>

//                     {file && (
//                       <div className="text-left text-sm text-gray-600">
//                         <div className="font-medium">{file.name}</div>
//                         <div>{formatFileSize(file.size)} • {file.type || 'unknown'}</div>
//                       </div>
//                     )}
//                   </div>

//                   {previewUrl && (
//                     <div className="mt-4">
//                       <img src={previewUrl} alt="preview" className="max-h-48 rounded-md shadow-sm" />
//                     </div>
//                   )}
//                 </div>

//               </div>

//             </div>

//            <aside className="md:col-span-1">
//               <label className="block text-sm font-medium text-gray-700">Document Type</label>
//               <select value={docType} onChange={handleDocTypeChange} className="mt-2 block w-full rounded-md border-gray-300 py-2 px-3 text-sm">
//                 <option value="">Select document</option>
//                 <option value="govt_id">Government ID</option>
//                 <option value="passport">Passport</option>
//                 <option value="drivers_license">Drivers License</option>
//               </select>

//               <div className="mt-4">
//                 <DocumentFields docType={docType} fields={fields} onChange={handleFieldChange} />
//               </div>

//               <div className="mt-6 text-xs text-gray-400">We only accept valid government-issued documents. Your upload is encrypted and only used for verification.</div>
//             </aside> 

//           </div>

//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             {/* <button type="button" onClick={() => {}} className="flex-1 sm:flex-none px-4 py-2 border rounded-md text-sm">Back</button> */}
//             <button type="submit" className="flex-1 bg-[#1D4350] hover:bg-[#173844] text-white px-4 py-2  text-sm cursor-pointer">Continue</button>
//           </div>
//         </form>

//       </div>
//     </div>
//   );
// }


// IdentityVerificationComponent

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import DocumentFields from "./DocumentFields";
// import { BsUpload } from "react-icons/bs";

// type FileKind = "image" | "pdf" | "other" | null;

// export default function IdentityVerification() {
//   const [docType, setDocType] = useState<string>("");
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [fields, setFields] = useState<Record<string, string>>({});
//   const [error, setError] = useState<string>("");

//   const fileKind: FileKind = useMemo(() => {
//     if (!file) return null;
//     if (file.type === "application/pdf") return "pdf";
//     if (file.type.startsWith("image/")) return "image";
//     return "other";
//   }, [file]);

//   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const f = e.target.files?.[0] ?? null;
//     setError("");
//     setFile(null);
//     setPreviewUrl(null);

//     if (!f) return;

//     // Basic validations
//     const maxBytes = 5 * 1024 * 1024; // 5MB
//     const isPdf = f.type === "application/pdf";
//     const isImg = f.type.startsWith("image/");

//     if (!(isPdf || isImg)) {
//       setError("Only JPG, PNG, or PDF files are allowed.");
//       return;
//     }
//     if (f.size > maxBytes) {
//       setError("File is larger than 5MB.");
//       return;
//     }

//     setFile(f);
//     setPreviewUrl(URL.createObjectURL(f));
//   }

//   // Clean up object URL when file changes/unmounts
//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   function handleDocTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     const type = e.target.value;
//     setDocType(type);
//     setFields({});
//   }

//   function handleFieldChange(name: string, value: string) {
//     setFields((s) => ({ ...s, [name]: value }));
//   }

//   function formatFileSize(bytes: number) {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
//   }

//   function clearFile() {
//     setFile(null);
//     setPreviewUrl(null);
//     setError("");
//   }

//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     // Replace with real upload logic
//     alert(`Submitting ${docType} with file: ${file?.name ?? "(no file)"}`);
//   }

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl">
//         <div className="flex items-center gap-4 mb-6">
//           <button className="flex items-center gap-2 cursor-pointer bg-transparent text-gray-700 hover:bg-[#E8F1F1] ml-10">
//             <span className="text-2xl">←</span>
//             <span className="hidden sm:inline">Back</span>
//           </button>
//           <div className="flex-1 mt-15">
//             <div className="h-3 rounded-full bg-[#E8F1F2]">
//               <div className="h-3 rounded-full bg-[#1d4350] w-1/3" />
//             </div>
//             <div className="text-xs text-gray-500 mt-1">Step 2 of 5</div>
//           </div>
//         </div>

//         <form onSubmit={onSubmit} className="bg-white rounded-lg p-4 md:p-8 shadow-sm">
//           <h2 className="text-lg font-semibold mb-1">Identity Verification</h2>
//           <p className="text-sm text-gray-500 mb-6">
//             Verify your identity to ensure a safe community for all travelers
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload Government ID or Passport
//               </label>

//               <div className="w-full rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center gap-4">
//                 <div className="w-full flex justify-center">
//                   <span className="text-3xl">
//                     <BsUpload />
//                   </span>
//                 </div>

//                 <div className="text-center">
//                   <div className="mb-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-8 w-8 mx-auto text-gray-500"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 3a1 1 0 011-1h6a1 1 0 110 2H5v12h10V9a1 1 0 112 0v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3z"
//                         clipRule="evenodd"
//                       />
//                       <path d="M7 7a1 1 0 012 0v3h3a1 1 0 110 2H9a1 1 0 01-1-1V7z" />
//                     </svg>
//                   </div>
//                   <div className="text-base font-medium">Upload Government ID or Passport</div>
//                   <div className="text-xs text-gray-400">
//                     Accepted formats: JPG, PNG, PDF (max 5MB)
//                   </div>

//                   <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
//                     <label className="cursor-pointer inline-flex items-center justify-center border px-4 py-2 text-sm bg-white shadow-sm">
//                       <input
//                         type="file"
//                         accept="image/*,.pdf,application/pdf"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                       Choose File
//                     </label>

//                     {file && (
//                       <div className="text-left text-sm text-gray-600">
//                         <div className="font-medium flex items-center gap-2">
//                           {file.name}
//                           <button
//                             type="button"
//                             onClick={clearFile}
//                             className="text-xs underline"
//                             aria-label="Remove file"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                         <div>
//                           {formatFileSize(file.size)} • {file.type || "unknown"}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {error && (
//                     <div className="mt-3 text-xs text-red-600" role="alert">
//                       {error}
//                     </div>
//                   )}

//                   {/* Live preview */}
//                   {previewUrl && (
//                     <div className="mt-4 w-full">
//                       {fileKind === "image" && (
//                         <img
//                           src={previewUrl}
//                           alt="preview"
//                           className="max-h-64 rounded-md shadow-sm mx-auto"
//                         />
//                       )}

//                       {fileKind === "pdf" && (
//                         <div className="w-full">
//                           {/* Some mobile browsers may download instead of previewing PDFs */}
//                           <iframe
//                             src={previewUrl}
//                             className="w-full h-80 rounded-md shadow-sm"
//                             title="PDF preview"
//                           />
//                           <div className="mt-2 text-xs text-gray-500">
//                             If the PDF doesn’t display,{" "}
//                             <a href={previewUrl} target="_blank" rel="noreferrer" className="underline">
//                               open it in a new tab
//                             </a>
//                             .
//                           </div>
//                         </div>
//                       )}

//                       {fileKind === "other" && (
//                         <div className="text-xs text-gray-500">
//                           Preview not available for this file type.
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <aside className="md:col-span-1">
//               <label className="block text-sm font-medium text-gray-700">Document Type</label>
//               <select
//                 value={docType}
//                 onChange={handleDocTypeChange}
//                 className="mt-2 block w-full rounded-md border-gray-300 py-2 px-3 text-sm"
//               >
//                 <option value="">Select document</option>
//                 <option value="govt_id">Government ID</option>
//                 <option value="passport">Passport</option>
//                 <option value="drivers_license">Drivers License</option>
//               </select>

//               <div className="mt-4">
//                 <DocumentFields docType={docType} fields={fields} onChange={handleFieldChange} />
//               </div>

//               <div className="mt-6 text-xs text-gray-400">
//                 We only accept valid government-issued documents. Your upload is encrypted and only used for
//                 verification.
//               </div>
//             </aside>
//           </div>

//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               type="submit"
//               className="flex-1 bg-[#1D4350] hover:bg-[#173844] text-white px-4 py-2 text-sm cursor-pointer"
//             >
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import DocumentFields from "./DocumentFields";
// import { BsUpload } from "react-icons/bs";

// type FileKind = "image" | "pdf" | "other" | null;

// export default function IdentityVerification() {
//   const [docType, setDocType] = useState<string>("");
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [fields, setFields] = useState<Record<string, string>>({});
//   const [error, setError] = useState<string>("");
//   const [showPreview, setShowPreview] = useState<boolean>(false);

//   const fileKind: FileKind = useMemo(() => {
//     if (!file) return null;
//     if (file.type === "application/pdf") return "pdf";
//     if (file.type.startsWith("image/")) return "image";
//     return "other";
//   }, [file]);

//   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const f = e.target.files?.[0] ?? null;
//     setError("");
//     setFile(null);
//     setPreviewUrl(null);
//     setShowPreview(false);

//     if (!f) return;

//     const maxBytes = 5 * 1024 * 1024; // 5MB
//     const isPdf = f.type === "application/pdf";
//     const isImg = f.type.startsWith("image/");

//     if (!(isPdf || isImg)) {
//       setError("Only JPG, PNG, or PDF files are allowed.");
//       return;
//     }
//     if (f.size > maxBytes) {
//       setError("File is larger than 5MB.");
//       return;
//     }

//     setFile(f);
//     setPreviewUrl(URL.createObjectURL(f));
//   }

//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   function handleDocTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     const type = e.target.value;
//     setDocType(type);
//     setFields({});
//   }

//   function handleFieldChange(name: string, value: string) {
//     setFields((s) => ({ ...s, [name]: value }));
//   }

//   function formatFileSize(bytes: number) {
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
//   }

//   function clearFile() {
//     setFile(null);
//     setPreviewUrl(null);
//     setError("");
//     setShowPreview(false);
//   }

//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     alert(`Submitting ${docType} with file: ${file?.name ?? "(no file)"}`);
//   }

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-10">
//       <div className="w-full max-w-4xl">
//         {/* HEADER */}
//         <div className="flex items-center gap-4 mb-6">
//           <button className="flex items-center gap-2 cursor-pointer bg-transparent text-gray-700 hover:bg-[#E8F1F1] ml-10">
//             <span className="text-2xl">←</span>
//             <span className="hidden sm:inline">Back</span>
//           </button>
//           <div className="flex-1 mt-15">
//             <div className="h-3 rounded-full bg-[#E8F1F2]">
//               <div className="h-3 rounded-full bg-[#1d4350] w-1/3" />
//             </div>
//             <div className="text-xs text-gray-500 mt-1">Step 2 of 5</div>
//           </div>
//         </div>

//         {/* FORM */}
//         <form onSubmit={onSubmit} className="bg-white rounded-lg p-4 md:p-8 shadow-sm">
//           <h2 className="text-lg font-semibold mb-1">Identity Verification</h2>
//           <p className="text-sm text-gray-500 mb-6">
//             Verify your identity to ensure a safe community for all travelers
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
//             {/* LEFT SIDE */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload Government ID or Passport
//               </label>

//               <div className="w-full rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center gap-4">
//                 <div className="w-full flex justify-center">
//                   <span className="text-3xl">
//                     <BsUpload />
//                   </span>
//                 </div>

//                 <div className="text-center">
//                   <div className="mb-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-8 w-8 mx-auto text-gray-500"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3 3a1 1 0 011-1h6a1 1 0 110 2H5v12h10V9a1 1 0 112 0v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3z"
//                         clipRule="evenodd"
//                       />
//                       <path d="M7 7a1 1 0 012 0v3h3a1 1 0 110 2H9a1 1 0 01-1-1V7z" />
//                     </svg>
//                   </div>
//                   <div className="text-base font-medium">Upload Government ID or Passport</div>
//                   <div className="text-xs text-gray-400">
//                     Accepted formats: JPG, PNG, PDF (max 5MB)
//                   </div>

//                   <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
//                     <label className="cursor-pointer inline-flex items-center justify-center border px-4 py-2 text-sm bg-white shadow-sm">
//                       <input
//                         type="file"
//                         accept="image/*,.pdf,application/pdf"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                       Choose File
//                     </label>

//                     {file && (
//                       <div className="text-left text-sm text-gray-600">
//                         <div className="font-medium flex items-center gap-2">
//                           {file.name}
//                           <button
//                             type="button"
//                             onClick={clearFile}
//                             className="text-xs underline cursor-pointer"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                         <div>
//                           {formatFileSize(file.size)} • {file.type || "unknown"}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {error && (
//                     <div className="mt-3 text-xs text-red-600" role="alert">
//                       {error}
//                     </div>
//                   )}

//                   {/* ✅ SUCCESS MESSAGE */}
//                   {file && !error && (
//                     <div className="mt-4 text-green-600 font-medium text-sm">
//                       ✅ File uploaded successfully!
//                     </div>
//                   )}

//                   {/* 👁️ SHOW / HIDE PREVIEW TOGGLE */}
//                   {file && previewUrl && (
//                     <div className="mt-3">
//                       {!showPreview ? (
//                         <button
//                           type="button"
//                           onClick={() => setShowPreview(true)}
//                           className="text-xs text-blue-600 underline cursor-pointer"
//                         >
//                           Show Preview
//                         </button>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={() => setShowPreview(false)}
//                           className="text-xs text-blue-600 underline cursor-pointer"
//                         >
//                           Hide Preview
//                         </button>
//                       )}
//                     </div>
//                   )}

//                   {/* 📄 PREVIEW */}
//                   {showPreview && previewUrl && (
//                     <div className="mt-4 w-full">
//                       {fileKind === "image" && (
//                         <img
//                           src={previewUrl}
//                           alt="preview"
//                           className="max-h-64 rounded-md shadow-sm mx-auto cursor-pointer"
//                         />
//                       )}

//                       {fileKind === "pdf" && (
//                         <div className="w-full">
//                           <iframe
//                             src={previewUrl}
//                             className="w-full h-80 rounded-md shadow-sm"
//                             title="PDF preview"
//                           />
//                           <div className="mt-2 text-xs text-gray-500">
//                             If the PDF doesn’t display,{" "}
//                             <a
//                               href={previewUrl}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="underline"
//                             >
//                               open it in a new tab
//                             </a>
//                             .
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <aside className="md:col-span-1">
//               <label className="block text-sm font-medium text-gray-700">Document Type</label>
//               <select
//                 value={docType}
//                 onChange={handleDocTypeChange}
//                 className="mt-2 block w-full rounded-md border-gray-300 py-2 px-3 text-sm"
//               >
//                 <option value="">Select document</option>
//                 <option value="govt_id">Government ID</option>
//                 <option value="passport">Passport</option>
//                 <option value="drivers_license">Driver’s License</option>
//               </select>

//               <div className="mt-4">
//                 <DocumentFields docType={docType} fields={fields} onChange={handleFieldChange} />
//               </div>

//               <div className="mt-6 text-xs text-gray-400">
//                 We only accept valid government-issued documents. Your upload is encrypted and only used for
//                 verification.
//               </div>
//             </aside>
//           </div>

//           {/* CONTINUE BUTTON */}
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               type="submit"
//               className="flex-1 bg-[#1D4350] hover:bg-[#173844] text-white px-4 py-2 text-sm cursor-pointer"
//             >
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// IdentityVerificationComponent

"use client";

import React, { useEffect, useMemo, useState } from "react";
import DocumentFields from "./DocumentFields";
import { BsUpload } from "react-icons/bs";
import Image from "next/image";

type Mode = "pdf" | "image" | null;

export default function IdentityVerification() {
  const [docType, setDocType] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const MAX_IMAGES = 5;

  const mode: Mode = useMemo(() => {
    if (files.length === 0) return null;
    if (files.length === 1 && files[0].type === "application/pdf") return "pdf";
    // If we have any images and no PDFs, treat as image mode
    if (files.every((f) => f.type.startsWith("image/"))) return "image";
    return null; // invalid/mixed (shouldn’t happen because we guard)
  }, [files]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setError("");
    // Clear current state
    setFiles([]);
    setShowPreview(false);
    // Revoke previous URLs
    setPreviewUrls((urls) => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      return [];
    });

    if (selected.length === 0) return;

    const pdfs = selected.filter((f) => f.type === "application/pdf");
    const images = selected.filter((f) => f.type.startsWith("image/"));

    // Validate: no other types
    if (pdfs.length + images.length !== selected.length) {
      setError("Only JPG, PNG, or PDF files are allowed.");
      return;
    }

    // If any PDF is present → must be exactly one and no images
    if (pdfs.length > 0) {
      if (selected.length > 1 || images.length > 0) {
        setError("Only one PDF is allowed and cannot be mixed with images.");
        return;
      }
      const f = pdfs[0];
      if (f.size > 5 * 1024 * 1024) {
        setError("File is larger than 5MB.");
        return;
      }
      const url = URL.createObjectURL(f);
      setFiles([f]);
      setPreviewUrls([url]);
      return;
    }

    // Images mode
    // Size + count validations
    if (images.some((f) => f.size > 5 * 1024 * 1024)) {
      setError("Each image must be 5MB or less.");
      return;
    }
    if (images.length > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const urls = images.map((f) => URL.createObjectURL(f));
    setFiles(images);
    setPreviewUrls(urls);
  }

  // Cleanup object URLs when they change/unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [previewUrls]);

  function handleDocTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const type = e.target.value;
    setDocType(type);
    setFields({});
  }

  function handleFieldChange(name: string, value: string) {
    setFields((s) => ({ ...s, [name]: value }));
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function clearAll() {
    setFiles([]);
    setShowPreview(false);
    setError("");
    setPreviewUrls((urls) => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      return [];
    });
  }

  function removeImageAt(index: number) {
    // Remove one image (images mode only)
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      // Revoke removed URL
      const toRemove = prev[index];
      if (toRemove) URL.revokeObjectURL(toRemove);
      return prev.filter((_, i) => i !== index);
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const names = files.map((f) => f.name).join(", ");
    alert(`Submitting ${docType || "(no document type)"} with file(s): ${names || "(none)"}`);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-10">
      <div className="w-full max-w-4xl">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 cursor-pointer bg-transparent text-gray-700 hover:bg-[#E8F1F1] ml-10">
            <span className="text-2xl">←</span>
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex-1 mt-15">
            <div className="h-3 rounded-full bg-[#E8F1F2]">
              <div className="h-3 rounded-full bg-[#1d4350] w-1/3" />
            </div>
            <div className="text-xs text-gray-500 mt-1">Step 2 of 5</div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="bg-white rounded-lg p-4 md:p-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Identity Verification</h2>
          <p className="text-sm text-gray-500 mb-6">
            Verify your identity to ensure a safe community for all travelers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* LEFT */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Government ID or Passport
              </label>

              <div className="w-full rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center gap-4">
                <div className="w-full flex justify-center">
                  <span className="text-3xl">
                    <BsUpload />
                  </span>
                </div>

                <div className="text-center">
                  <div className="mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h6a1 1 0 110 2H5v12h10V9a1 1 0 112 0v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3z"
                        clipRule="evenodd"
                      />
                      <path d="M7 7a1 1 0 012 0v3h3a1 1 0 110 2H9a1 1 0 01-1-1V7z" />
                    </svg>
                  </div>
                  <div className="text-base font-medium">Upload Government ID or Passport</div>
                  <div className="text-xs text-gray-400">
                    Accepted formats: JPG, PNG (up to {MAX_IMAGES} images), or a single PDF (max 5MB each)
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <label className="cursor-pointer inline-flex items-center justify-center border px-4 py-2 text-sm bg-white shadow-sm">
                      <input
                        type="file"
                        // We allow multiple selection; code enforces the rules (single PDF or multiple images)
                        multiple
                        accept="image/*,.pdf,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      Choose File(s)
                    </label>

                    {files.length > 0 && (
                      <div className="text-left text-sm text-gray-600">
                        {/* Names & meta */}
                        <div className="font-medium flex items-center gap-2 flex-wrap">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-2">
                              {f.name}
                              {mode === "image" && (
                                <button
                                  type="button"
                                  onClick={() => removeImageAt(i)}
                                  className="text-xs underline cursor-pointer"
                                  aria-label={`Remove ${f.name}`}
                                >
                                  Remove
                                </button>
                              )}
                              {i < files.length - 1 && <span>•</span>}
                            </span>
                          ))}
                          {mode === "pdf" && (
                            <button
                              type="button"
                              onClick={clearAll}
                              className="text-xs underline cursor-pointer"
                              aria-label="Remove PDF"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="text-xs mt-1">
                          {files.map((f, i) => (
                            <span key={i}>
                              {formatFileSize(f.size)} • {f.type || "unknown"}
                              {i < files.length - 1 && " | "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="mt-3 text-xs text-red-600" role="alert">
                      {error}
                    </div>
                  )}

                  {/* ✅ SUCCESS MESSAGE */}
                  {files.length > 0 && !error && (
                    <div className="mt-4 text-green-600 font-medium text-sm">
                      {mode === "pdf"
                        ? "✅ File uploaded successfully!"
                        : `✅ ${files.length} image${files.length > 1 ? "s" : ""} uploaded successfully!`}
                    </div>
                  )}

                  {/* 👁️ SHOW / HIDE PREVIEW TOGGLE */}
                  {files.length > 0 && previewUrls.length > 0 && !error && (
                    <div className="mt-3">
                      {!showPreview ? (
                        <button
                          type="button"
                          onClick={() => setShowPreview(true)}
                          className="text-xs text-blue-600 underline cursor-pointer"
                        >
                          Show Preview
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowPreview(false)}
                          className="text-xs text-blue-600 underline cursor-pointer"
                        >
                          Hide Preview
                        </button>
                      )}
                    </div>
                  )}

                  {/* 📄 PREVIEW */}
                  {showPreview && previewUrls.length > 0 && !error && (
                    <div className="mt-4 w-full">
                      {mode === "image" && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {previewUrls.map((u, i) => (
                            <div key={i} className="relative">
                              <Image
                                src={u}
                                alt={`preview-${i}`}
                                height={0}
                                width={0}
                                className="h-32 w-full object-cover rounded-md shadow-sm"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {mode === "pdf" && previewUrls[0] && (
                        <div className="w-full">
                          <iframe
                            src={previewUrls[0]}
                            className="w-full h-80 rounded-md shadow-sm"
                            title="PDF preview"
                          />
                          <div className="mt-2 text-xs text-gray-500">
                            If the PDF doesn’t display,{" "}
                            <a href={previewUrls[0]} target="_blank" rel="noreferrer" className="underline">
                              open it in a new tab
                            </a>
                            .
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <aside className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Document Type</label>
              <select
                value={docType}
                onChange={handleDocTypeChange}
                className="mt-2 block w-full rounded-md border-gray-300 py-2 px-3 text-sm"
              >
                <option value="">Select document</option>
                <option value="govt_id">Government ID</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver’s License</option>
              </select>

              <div className="mt-4">
                <DocumentFields docType={docType} fields={fields} onChange={handleFieldChange} />
              </div>

              <div className="mt-6 text-xs text-gray-400">
                We only accept valid government-issued documents. Your upload is encrypted and only used for
                verification.
              </div>
            </aside>
          </div>

          {/* CONTINUE BUTTON */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#1D4350] hover:bg-[#173844] text-white px-4 py-2 text-sm cursor-pointer"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
