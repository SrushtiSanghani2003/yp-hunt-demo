import { useSelector } from "react-redux";
import { selectArticle } from "../../redux-toolkit/articleSlice";
import ArticleHeroMediaPreview from "./ArticleHeroMediaPreview";
import VideosPreview from "../blocks/BlockPreviews/VideoBlock/VideosPreview";
import MultipleAdBlockPreview from "../blocks/BlockPreviews/MultipleAdBlockPreview";
import TextBlockPreview from "../blocks/BlockPreviews/TextBlockPreview";
import ButtonBlockPreview from "../blocks/BlockPreviews/ButtonBlockPreview";
import NewsPreview from "../blocks/BlockPreviews/NewsBlock/NewsPreview";
import ArticlesPreview from "../blocks/BlockPreviews/ArticleBlock/ArticlesPreview";
import AdBanner from "../blocks/BlockPreviews/AdBanner";
import AlbumsPreview from "../blocks/BlockPreviews/AlbumBlock/AlbumsPreview";
import BentosPreview from "../blocks/BlockPreviews/BentoBlock/BentosPreview";
import TestimonialsPreview from "../blocks/TestimonialsPreview";
import ShopPreview from "../blocks/BlockPreviews/ShopPreview";
import PartnersPreview from "../blocks/BlockPreviews/PartnersPreview";
import FaqPreview from "../blocks/BlockPreviews/FaqPreview";

const ArticlesLivePreview = () => {
  const articleData = useSelector(selectArticle);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <ArticleHeroMediaPreview
          data={articleData.translation}
          publishDate={articleData?.published_at || articleData?.scheduled_at}
        />
      </div>
      <div className="col-span-12">
        {articleData.blocks.map((block: any, _index: number) => {
          switch (block.block_type) {
            case "videos":
              return <VideosPreview data={block} key={block.sort_order} />;
            case "cta":
              return <ButtonBlockPreview data={block} key={block.sort_order} />;
            case "advertisement":
              return (
                <MultipleAdBlockPreview data={block} key={block.sort_order} />
              );
            case "text":
              return <TextBlockPreview data={block} key={block.sort_order} />;
            case "news":
              return <NewsPreview data={block} key={block.sort_order} />;
            case "articles":
              return <ArticlesPreview data={block} key={block.sort_order} />;
            case "promotions":
              return <AdBanner data={block} key={block.sort_order} />;
            case "albums":
              return <AlbumsPreview data={block} key={block.sort_order} />;
            case "bentoBox":
              return <BentosPreview data={block} key={block.sort_order} />;
            case "faq":
              return <FaqPreview data={block} key={block.sort_order} />;
            case "testimonials":
              return (
                <TestimonialsPreview
                  data={block?.content?.quotes}
                  title={block?.content?.more?.title}
                  key={block.sort_order}
                />
              );
            case "shop":
              return <ShopPreview data={block} key={block.sort_order} />;
            case "partners":
              return <PartnersPreview data={block} key={block.sort_order} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ArticlesLivePreview;
