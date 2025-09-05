import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Youtube, Facebook, ExternalLink } from 'lucide-react';

const youtubeVideos = [
  {
    id: 'DwQqm6RYbL4',
    title: 'Lion Roar Exhaust - Custom Exhaust Installation',
    description: 'Custom exhaust installation on a Covette C5'
  },
  {
    id: 'TJOyDa89TjA',
    title: 'Lion Roar Exhaust - Custom head pipes and cut-offs',
    description: 'Custom head pipes and cut-offs for a Lexus IS F 5.0L V8'
  }
];

const facebookVideos = [
  {
    id: '/Roarexhaust/videos/1690362304798941/',
    title: 'One of the new Exhaust Upgrades, 2020 Dodge Durango',
    description: ''
  },
  {
    id: '/Roarexhaust/videos/23962540383411609/',
    title: 'Latest Exhaust Upgrade 2018 Chevrolet Camaro',
    description: ''
  }
];

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

        {/* Facebook Videos Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Facebook className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-2xl font-oswald font-semibold text-foreground">
              Facebook Videos
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {facebookVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover-scale">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F${video.id}&show_text=false&width=560&t=0`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
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
              onClick={() => window.open('https://www.facebook.com/Roarexhaust', '_blank')}
            >
              <Facebook className="w-4 h-4 mr-2 text-blue-600" />
              Visit Our Facebook Page
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
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
              onClick={() => window.open('https://www.youtube.com/@SirJayB', '_blank')}
            >
              <Youtube className="w-4 h-4 mr-2 text-red-600" />
              Visit Our YouTube Channel
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};