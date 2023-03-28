import React, {ChangeEventHandler} from 'react';

interface ImageInputProps {
    file: File | null | undefined
    imageSrc: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

const ImageInput: React.FC<ImageInputProps> = ({file, onChange, imageSrc}) => {

    function getImage() {
        if (file) {
            return (
                <div>
                    <img className="max-w-xs max-h-xs" src={imageSrc}/>
                </div>
            )
        } else {
            return (
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        }
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Cover photo</label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">

                    {getImage()}
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Нажмите для загрузки</span>
                            <input
                                onChange={onChange}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageInput;