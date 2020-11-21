import React from "react";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";
import BlockContent from "@sanity/block-content-to-react";
import { FaLongArrowAltRight, FaVideo } from "react-icons/fa";

import Layout from "../components/layout";
import SEO from "../components/seo";

const ProjectPage = ({ data: { project } }) => {
  const dateToString = dateString => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    return `${month} ${date.getFullYear()}`;
  };

  return (
    <Layout>
      <SEO title={`${project.title} | Projects`} />
      <section className="container mb-12">
        <div className="flex flex-wrap border-4 border-accent">
          {project.image ? (
            <div className="w-full md:w-1/2">
              <Image
                className="h-full border-b-4 md:border-r-4 md:border-b-0 border-accent"
                fluid={project.image.asset.fluid}
                alt={project.title}
              />
            </div>
          ) : null}
          <div
            className={`w-full p-6 bg-primary-light text-primary-dark ${
              project.image ? "md:w-1/2" : ""
            }`}
          >
            <h1 className="text-4xl font-bold leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-xl mb-2 text-secondary-dark">
              {project.status == "completed"
                ? "Completed:"
                : "Estimated Completion:"}
              <span className="ml-1">
                {dateToString(project.completionDate)}
              </span>
            </p>
            {project.video ? (
              <a href={project.video}>
                <span className="block text-accent text-xl mb-2">
                  Video
                  <FaVideo className="text-2xl inline ml-2" />
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </section>
      <section className="container mb-12">
        <h2 className="heading uppercase mb-2 text-4xl" data-text="Description">
          Description
        </h2>
        <div className="style-normal">
          <BlockContent
            blocks={project.description}
            serializers={{}}
            projectId={process.env.GATSBY_SANITY_ID}
            dataset={process.env.GATSBY_SANITY_DATASET}
          />
        </div>
      </section>
      {project.statistics.length > 0 ? (
        <section className="container">
          <h2
            className="heading uppercase mb-2 text-4xl"
            data-text="Statistics"
          >
            Statistics
          </h2>
          {project.statistics && project.statistics.length > 0 ? (
            <div>
              {project.statistics.map((statistic, i) => (
                <div
                  className={`transition p-4 flex justify-between hover:bg-red-300 hover:text-primary-dark
              ${
                i < project.statistics.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
                  key={i}
                >
                  <p>{statistic.title}</p>
                  <p>{statistic.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
      {project.posts && project.posts.length > 0 ? (
        <section className="container">
          <h2
            className="heading uppercase mb-2 text-4xl"
            data-text="Related Posts"
          >
            Related Posts
          </h2>
          <div>
            {project.posts.map(post => (
              <Link to={`/blog/${post.slug.current}`}>
                <a className="block text-accent text-xl mb-2">
                  {post.title}
                  <FaLongArrowAltRight className="text-2xl inline ml-2" />
                </a>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </Layout>
  );
};

export const query = graphql`
  query($id: String) {
    project: sanityProject(_id: { eq: $id }) {
      description: _rawDescription
      slug {
        current
      }
      status
      statistics {
        title
        value
      }
      title
      completionDate
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      video
      posts {
        slug {
          current
        }
        title
      }
    }
  }
`;

export default ProjectPage;
