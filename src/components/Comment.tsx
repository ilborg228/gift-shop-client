import React from 'react';
import {IComment} from "../utils/types";
import {StarIcon} from "@heroicons/react/solid";

interface CommentProps {
    comment: IComment
}

const Comment: React.FC<CommentProps> = ({comment}) => {

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                        key={rating}
                        className={classNames(
                            comment.scoreValue > rating ? 'text-gray-900' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                    />
                ))}
                <p className="my-5 text-gray-500">{comment?.text}</p>
            </div>
        </div>
    );
};

export default Comment;