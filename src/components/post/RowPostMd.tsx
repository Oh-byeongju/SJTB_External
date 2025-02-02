'use client';

import Image from 'next/image';

import {EBlank} from "@/types/enums/common-enum";
import {IPostData} from "@/types/interfaces/post-interface";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

import Blank from "@/components/blank/Blank";
import styles from './RowPostMd.module.scss';

const RowPostMd = ({postData}: {postData: IPostData}) => {
    const actionAndNavigate = useActionAndNavigate(`/board/${postData.slug}`);
    const onClick = () => actionAndNavigate.actionAndNavigate(`/board/${postData.slug}`)

    return (
        <button className={styles.baseContainer} onClick={onClick}>
            <div className={styles.thumbnail}>
                <Image src={`${postData.thumbnail}`} alt='' fill style={{objectFit: 'cover'}}/>
            </div>
            <Blank type={EBlank.Column} size={20}/>
            <div className={styles.contentsContainer}>
                <div className={styles.title}>
                    {postData.title}
                </div>
                <div className={styles.desc}>
                    {postData.description}
                </div>
                <div className={styles.info}>
                    {`${postData.dateModified} | ${postData.author}`}
                </div>
            </div>
        </button>
    )
}

export default RowPostMd;