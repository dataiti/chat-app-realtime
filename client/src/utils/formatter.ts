export const formatMediaMessageContent = (type?: string, content?: string) =>
     type === "LINK" ? content : content?.split("/").pop()?.toString();
