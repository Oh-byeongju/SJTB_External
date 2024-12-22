import {Metadata} from "next";
import {redirect} from "next/navigation";
import Script from 'next/script'

import {EBannerType, EBlank} from '@/types/enums/common-enum';
import {IPostData} from "@/types/interfaces/post-interface";
import {getParamSlugs, getPostBySlug} from "@/utils/postUtil";
import {IMetadata} from "@/types/interfaces/metadata-interface";
import {META} from "@/contants/metadata";
import {getMetadata} from "@/seo/metadata/getMetadata";
import {getLdJsonArticle} from "@/seo/ldJson/getLdJsonArticle";

import Blank from '@/components/blank/Blank';
import PageContainer from '@/components/containers/PageContainer';
import Banner from '@/components/banner/Banner';
import WriterInfo from '@/components/read/WriterInfo';
import ContentsContainer from '@/components/containers/ContentsContainer';
import BodyContainer from '@/components/containers/BodyContainer';
import TagList from '@/components/read/TagList';
import EditorSection from "@/components/edit/EditorSection";
import Summary from "@/components/read/Summary";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const post = getPostBySlug(params.slug)
    if (!post) return {};
    const metadata: IMetadata = {
        title: `${post.title} - 세정아이앤씨 기술 블로그`,
        description: post.description,
        keywords: post.keywords,
        baseUrl: META.baseUrl,
        pageUrl: `/board/${params.slug}`,
        ogImage: post.thumbnail
    };
    return getMetadata(metadata);
}
export async function generateStaticParams() {
    return getParamSlugs();
}
// 스크롤 제어 생각해보기
// https://velog.io/@seesaw/Next.js%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9C%84%EC%B9%98-%EC%9C%A0%EC%A7%80%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-Scroll-Restoration

const Post = (props: Props) => {
    const post: IPostData | undefined = getPostBySlug(props.params.slug);

    if (!post) {
        redirect('/');
    }

    const jsonLd = getLdJsonArticle({
        id: `${META.baseUrl}/board/${post.slug}`,
        headline: post.title,
        image: [post.thumbnail],
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: { name: post.author, url: '' },
        keywords: post.keywords,
    });

    return (
        <>
            <Script
                id="json-ld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PageContainer>
                <Blank type={EBlank.Header}/>
                {
                    !post ?
                        <Banner type={EBannerType.Home} title={""}/>
                        :
                        <>
                            <Banner type={EBannerType.Read} title={post.title} author={post.author}
                                    dateModified={post.dateModified}/>
                            <BodyContainer>
                                <ContentsContainer>
                                    <Summary description={post.description}/>
                                    <EditorSection post={post} readOnly={true}/>
                                    <WriterInfo author={post.author}/>
                                    <TagList tags={post.keywords}/>
                                    {/*<ActivityBox slug={post.slug}/>*/}
                                </ContentsContainer>
                            </BodyContainer>
                        </>
                }
            </PageContainer>
        </>
    );
};

export default Post;
