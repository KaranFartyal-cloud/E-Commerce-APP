import {
  Box,
  Card,
  CardBody,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const Section = ({ 
  title, 
  photos = [], 
  imageHeight = "100px",
  cardProps = {},
  imageProps = {},
  titleProps = {}
}) => {
  // Ensure we always have 4 photos (fill with empty strings if needed)
  const displayedPhotos = [...photos, ...Array(4 - photos.length).fill("")].slice(0, 4);
  
  return (
    <VStack spacing={4} align="stretch" width="100%">
      <Heading as="h3" size="md" {...titleProps}>
        {title}
      </Heading>
      
      <HStack spacing={4} justify="space-between">
        {displayedPhotos.slice(0, 2).map((photo, index) => (
          <Card key={`top-${index}`} flex={1} {...cardProps}>
            <CardBody>
              {photo && (
                <Image 
                  src={photo} 
                  height={imageHeight} 
                  objectFit="cover"
                  width="100%"
                  {...imageProps}
                />
              )}
            </CardBody>
          </Card>
        ))}
      </HStack>
      
      <HStack spacing={4} justify="space-between">
        {displayedPhotos.slice(2, 4).map((photo, index) => (
          <Card key={`bottom-${index}`} flex={1} {...cardProps}>
            <CardBody>
              {photo && (
                <Image 
                  src={photo} 
                  height={imageHeight} 
                  objectFit="cover"
                  width="100%"
                  {...imageProps}
                />
              )}
            </CardBody>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
};

export default Section;