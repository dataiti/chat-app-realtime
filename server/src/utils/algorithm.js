export function getMessageType(content) {
     const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
     const fileRegex = /\.(pdf|docx|xlsx|pptx|txt|zip|rar|7z|tar|gz)$/i;
     const linkRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;

     if (typeof content === "string") {
          if (linkRegex.test(content)) {
               return "LINK";
          } else if (imageRegex.test(content)) {
               return "IMAGE";
          } else if (fileRegex.test(content)) {
               return "FILE";
          } else {
               return "TEXT";
          }
     }

     return "TEXT";
}

export const getFileType = (filename) => {
     const fileTypes = {
          DOC: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i,
          ZIP: /\.(zip|rar|7z|tar|gz)$/i,
     };

     for (const [type, regex] of Object.entries(fileTypes)) {
          if (regex.test(filename)) {
               return type;
          }
     }

     return "UNKOWN";
};
