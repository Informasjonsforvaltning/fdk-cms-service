import type { Schema, Attribute } from '@strapi/strapi';

export interface BasicImage extends Schema.Component {
  collectionName: 'image';
  info: {
    icon: 'image';
    name: 'Image';
    singularName: 'image';
    pluralName: 'images';
    displayName: 'Image';
    description: '';
  };
  attributes: {
    media: Attribute.Media;
    alternativeText: Attribute.String;
    style: Attribute.Enumeration<['none', 'fullSize', 'left', 'right']>;
  };
}

export interface BasicParagraph extends Schema.Component {
  collectionName: 'paragraph';
  info: {
    name: 'Paragraph';
    icon: 'align-justify';
    singularName: 'paragraph';
    pluralName: 'paragraphs';
    displayName: 'Paragraph';
    description: '';
  };
  attributes: {
    Content: Attribute.RichText;
  };
}

export interface BasicQuote extends Schema.Component {
  collectionName: 'quote';
  info: {
    name: 'Quote';
    icon: 'quote-left';
    singularName: 'quote';
    pluralName: 'quotes';
    displayName: 'Quote';
    description: '';
  };
  attributes: {
    content: Attribute.Text;
    author: Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'basic.image': BasicImage;
      'basic.paragraph': BasicParagraph;
      'basic.quote': BasicQuote;
    }
  }
}
