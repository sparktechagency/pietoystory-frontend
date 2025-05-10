export interface UploadProps {
    action?: string;                           // URL of the upload server
    name?: string;                             // Name of the file parameter
    multiple?: boolean;                        // Allow multiple file uploads
    headers?: object;                          // Headers for the upload request
    data?: object | ((file: UploadFile) => object); // Data to be sent with upload
    fileList?: UploadFile[];                   // Controlled list of files
    onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void; // Triggered on file change
    beforeUpload?: (file: UploadFile, fileList: UploadFile[]) => boolean | Promise<void>; // Before upload hook
    customRequest?: (options: object) => void; // Custom upload method
    showUploadList?: boolean;                  // Show or hide the default upload list
    listType?: 'text' | 'picture' | 'picture-card'; // Display style
  }


  export interface UploadFile<T = any> {
    uid: string;                      // Unique identifier for the file
    name: string;                     // File name
    status?: 'uploading' | 'done' | 'error' | 'removed'; // Status of the file
    response?: T;                     // Server response (if available)
    url?: string;                     // URL if the file is already hosted
    thumbUrl?: string;                // Thumbnail image URL
    originFileObj?: File;             // Original File object
    percent?: number;                 // Upload progress percentage
    type?: string;                    // File type (e.g., image/png)
    size?: number;                    // File size in bytes
    lastModified?: number;            // Last modified timestamp
    lastModifiedDate?: Date;          // Last modified date
    preview?: string;                 // Preview URL
  }