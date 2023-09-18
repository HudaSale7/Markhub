/* eslint-disable @typescript-eslint/ban-ts-comment */
export const shareProjectModal = {
  title: "Share Project",
  html: `
    <div class="flex  flex-col ">
        <input id="email" placeholder="User Email" class="swal2-input">
        <select id="accessType" class="swal2-select">
            <option value="EDIT">EDIT</option>
            <option value="VIEW">VIEW</option>
        </select>
    </div>
      
      `,
  focusConfirm: false,
  preConfirm: () => {
    return {
      //@ts-ignore
      email: document.getElementById("email")?.value,
      //@ts-ignore
      accessType: document.getElementById("accessType")?.value,
    };
  },
};
