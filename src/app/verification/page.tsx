import React from 'react'

// import DocumentFields from './components/DocumentFields'
// import IdentityVerification from './components/IdentityVerificationComponent'



// function Page() {
//   return (
//     <div>
//       <IdentityVerification/>
//       <DocumentFields/>
//       </div>
//   )
// }



// function Page() {
//   return (
//     <div>
//       <IdentityVerification
//         docType="passport"
//         onChange={(data) => console.log(data)}
//       />

//       <DocumentFields
//         docType="passport"
//         fields={[{ name: "fullName", label: "Full Name" }]}
//         onChange={(f) => console.log(f)}
//       />
//     </div>
//   );
// }
// export default Page

// import React from "react";

import IdentityVerification from "./components/IdentityVerificationComponent";

export default function Page() {
  return (
    <div>
      <IdentityVerification />
    </div>
  );
}
