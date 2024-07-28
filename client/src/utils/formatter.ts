export const formatMediaMessageContent = (type?: string, content?: string) =>
     type === "LINK" ? content : content?.split("/").pop()?.toString();

export function getMessageType(content: string) {
     const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
     const fileRegex = /\.(pdf|docx|xlsx|pptx|txt|zip|rar|7z|tar|gz)$/i;

     if (imageRegex.test(content)) {
          return "IMAGE";
     } else if (fileRegex.test(content)) {
          return "FILE";
     }

     return "TEXT";
}

export const getFileType = (filename: string) => {
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

export const formatRelativeTime = (timestamp: string): string => {
     const now = new Date();
     const time = new Date(timestamp);
     const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

     const minutes = Math.floor(diffInSeconds / 60);
     const hours = Math.floor(diffInSeconds / 3600);
     const days = Math.floor(diffInSeconds / 86400);
     const weeks = Math.floor(diffInSeconds / 604800);

     if (weeks > 0) {
          return `${weeks}w`;
     } else if (days > 0) {
          return `${days}d`;
     } else if (hours > 0) {
          return `${hours}h`;
     } else if (minutes > 0) {
          return `${minutes}m`;
     } else {
          return `${diffInSeconds}s`;
     }
};
