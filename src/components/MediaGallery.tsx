import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Youtube, Instagram, Facebook, ExternalLink } from 'lucide-react';

const youtubeVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Custom Exhaust Installation Process',
    description: 'Watch our expert team install a custom stainless steel exhaust system'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Before & After: Performance Upgrade',
    description: 'See the dramatic difference our exhaust systems make'
  }
];

const socialImages = [
  {
    src: '/api/placeholder/300/300',
    alt: 'Custom exhaust work',
    platform: 'instagram',
    caption: 'Another satisfied customer!'
  },
  {
    src: '/api/placeholder/300/300',
    alt: 'Fabrication process',
    platform: 'facebook',
    caption: 'Precision fabrication in progress'
  },
  {
    src: '/api/placeholder/300/300',
    alt: 'Finished exhaust system',
    platform: 'instagram',
    caption: 'Beautiful stainless steel finish'
  },
  {
    src: '/api/placeholder/300/300',
    alt: 'Workshop setup',
    platform: 'facebook',
    caption: 'State-of-the-art equipment'
  },
  {
    src: '/api/placeholder/300/300',
    alt: 'Team at work',
    platform: 'instagram',
    caption: 'Our skilled craftsmen'
  },
  {
    src: '/api/placeholder/300/300',
    alt: 'Quality testing',
    platform: 'facebook',
    caption: 'Quality control in action'
  }
];

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook
};

export const MediaGallery: React.FC = () => {
  return (
    <section id="media" className="py-16 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-oswald font-bold text-foreground mb-4">
            Our Work in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our latest projects, behind-the-scenes content, and customer transformations
          </p>
        </div>

        {/* YouTube Videos Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Youtube className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-2xl font-oswald font-semibold text-foreground">
              YouTube Channel
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {youtubeVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover-scale">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2">{video.title}</h4>
                  <p className="text-muted-foreground text-sm">{video.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="group"
              onClick={() => window.open('https://youtube.com/@yourusername', '_blank')}
            >
              <Youtube className="w-4 h-4 mr-2 text-red-600" />
              Visit Our YouTube Channel
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Social Media Gallery */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <Instagram className="w-6 h-6 text-pink-600 mr-2" />
            <Facebook className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-2xl font-oswald font-semibold text-foreground">
              Social Media Gallery
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {socialImages.map((image, index) => {
              const PlatformIcon = platformIcons[image.platform as keyof typeof platformIcons];
              return (
                <Card key={index} className="overflow-hidden hover-scale group">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          image.platform === 'instagram' 
                            ? 'bg-pink-600/90 text-white' 
                            : 'bg-blue-600/90 text-white'
                        }`}
                      >
                        <PlatformIcon className="w-3 h-3 mr-1" />
                        {image.platform}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <p className="text-white p-4 text-sm">{image.caption}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="outline" 
              className="group"
              onClick={() => window.open('https://instagram.com/yourusername', '_blank')}
            >
              <Instagram className="w-4 h-4 mr-2 text-pink-600" />
              Follow on Instagram
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="group"
              onClick={() => window.open('https://facebook.com/yourusername', '_blank')}
            >
              <Facebook className="w-4 h-4 mr-2 text-blue-600" />
              Like on Facebook
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};