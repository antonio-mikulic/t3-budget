import { ChangeEvent, useState } from 'react';
import Button, { ButtonType } from './Button';

const FileUpload = (props: { title: string; url: string; onUpload: () => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setFile(i);
        }
    };

    const uploadToServer = async () => {
        if (!file) return;
        setIsLoading(true);

        const body = new FormData();
        body.append('file', file);
        console.log('fetching', props.url);

        try {
            const response = await fetch(props.url, {
                method: 'POST',
                body,
            });

            props.onUpload();
            const message = await response.json();
            console.log(message);
            setError(message?.body?.error ?? '');
        } catch (_e) {
            setError('Unknonw error occured. Please try again later.');
        } finally {
            setIsLoading(false);
            // setFile(null);
            console.log('reset state');
        }
    };

    return (
        <div>
            <input type="file" name="upload" onChange={uploadToClient} />
            <Button type="button" onClick={uploadToServer} disabled={!file || isLoading} role={ButtonType.Secondary}>
                {props.title}
            </Button>

            {error && <div>{error}</div>}
        </div>
    );
};
export default FileUpload;
