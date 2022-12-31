import React, {useState} from 'react';

interface CommentFormProps {
    onCreate: (text: string, scoreValue: string) => void
}

const CommentForm:React.FC<CommentFormProps> = ({onCreate}) => {

    const [score, setScore] = useState<string>('1')
    const [text, setText] = useState<string>('')

    return (
        <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Ваш комментарий</label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input type="text" name="price" id="price" onChange={event => setText(event.target.value)}
                       className="h-12 block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">Оценка</label>
                    <select id="score" name="score" onChange={event=> setScore(event.target.value)}
                            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <button
                        onClick={()=> {onCreate(text, score)}}
                        type="submit"
                        className="my-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Оставить комментарий
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentForm;