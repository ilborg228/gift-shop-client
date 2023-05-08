import React, {useContext} from 'react';
import {IComment} from "../../utils/types";
import {StarIcon} from "@heroicons/react/solid";
import {ROLE_ADMIN} from "../../utils/constants";
import {deleteComment, deleteProduct} from "../../utils/api";
import {AuthContext} from "../../context";

interface CommentProps {
    comment: IComment
    reload: () => void
}

const Comment: React.FC<CommentProps> = ({comment, reload}) => {

    const {user} = useContext(AuthContext)

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    function showAdminButtons() {
        if (user !== undefined && user.role === ROLE_ADMIN)
            return(
                <button
                    disabled={false}
                    onClick={() => {
                        if (window.confirm('Вы уверены что хотите удалить комментарий?')) {
                            deleteComment(comment.id).then(() => reload())
                        }
                    }}
                    type="submit"
                    className="my-3 disabled:bg-indigo-100 flex w-12 items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                </button>
            )
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
            </div>
            <p className="my-5 text-gray-500 w-12">{comment?.text}</p>
            {showAdminButtons()}
        </div>
    );
};

export default Comment;