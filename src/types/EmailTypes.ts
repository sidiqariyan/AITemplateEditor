export interface EmailComponent {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'container' | 'header' | 'footer' | 'social' | 'columns' | 'product' | 'video' | 'personalized';
  content: string;
  styles: {
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    backgroundImage?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
    border?: string;
    boxShadow?: string;
    lineHeight?: string;
  };
  attributes?: {
    href?: string;
    alt?: string;
    src?: string;
    target?: string;
    placeholder?: string;
    columns?: number;
    videoUrl?: string;
    price?: string;
    title?: string;
  };
  children?: EmailComponent[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject?: string;
  preheader?: string;
  components: EmailComponent[];
  settings: {
    width?: string;
    backgroundColor?: string;
    fontFamily?: string;
    responsive?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DragItem {
  type: string;
  id: string;
  index?: number;
}

export interface PersonalizationField {
  key: string;
  label: string;
  defaultValue: string;
}