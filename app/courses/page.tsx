// app/courses/page.tsx

'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import {
  Grid,
  GridItem,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react';
import CourseCard from '@/components/CourseCard'; // Ensure the path is correct
import { apiFetcher } from '@/utils';

interface ICourseTerm {
  course_term_id: number;
  season: string;
  year: number;
}

interface ICourseDetail {
  course_name: string;
  course_description: string;
}

interface ICourse {
  course_id: number;
  course_code: string;
  CourseDetail: ICourseDetail;
  course_term_id: number;
  course_section: string;
  course_delivery_format_id: number;
  createdAt: string;
  updatedAt: string;
  CourseTerm: ICourseTerm;
}

function getURL(page: string | null, limit: string) {
  let url: string;

  if (page) {
    url = `/api/courses?page=${page}&limit=${limit}`;
  } else {
    url = `/api/courses`;
  }

  return url;
}

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [groupedCourses, setGroupedCourses] = useState<Record<string, ICourse[]>>({});
  const [limit, setLimit] = useState<string>('2');

  const page = searchParams.get('page') || null;
  const coursesURL = getURL(page, limit);

  const { data: coursesResponse, error } = useSWR(coursesURL, apiFetcher);

  useEffect(() => {
    if (coursesResponse) {
      const coursesArray = coursesResponse.data.courses;

      // Group courses by course_code
      const groupedCourses = coursesArray.reduce(
        (acc: Record<string, ICourse[]>, course: ICourse) => {
          const { course_code } = course;
          if (!acc[course_code]) {
            acc[course_code] = [];
          }
          acc[course_code].push(course);
          return acc;
        },
        {}
      );

      setGroupedCourses(groupedCourses);
    }
  }, [coursesResponse]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
  };

  if (error) return <Text>Error loading courses</Text>;
  if (!coursesResponse) return <Text>Loading courses...</Text>;

  const uniqueCourseCodes = Object.keys(groupedCourses);
  const displayedCourseCodes = uniqueCourseCodes.slice(0, parseInt(limit, 10));

  return (
    <>
      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gap={{ base: '3', md: '3', lg: '6' }}
        p={{ base: '3', md: '3', lg: '5' }}
        margin="0 auto"
        w={{ base: '100%', xl: '95%' }}
        bgColor={'gray.100'}
      >
        {uniqueCourseCodes.length > 0 && (
          <GridItem
            gridColumn={{ base: 'span 12' }}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box p={5} width={{ base: '30%', sm: '30%', md: '20%', lg: '12%' }}>
              <NumberInput
                color="teal"
                backgroundColor="white"
                step={1}
                defaultValue={2}
                min={1}
                max={5}
                value={limit}
                onChange={(valueString) => {
                  handleLimitChange({
                    target: { value: valueString },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                keepWithinRange
                clampValueOnBlur
              >
                <NumberInputField readOnly css={{ cursor: 'default' }} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </GridItem>
        )}
        {uniqueCourseCodes.length > 0 ? (
          displayedCourseCodes.map((courseCode) => (
            <GridItem key={courseCode} gridColumn={{ base: 'span 12', md: 'span 6', lg: 'span 4' }}>
              <CourseCard courses={groupedCourses[courseCode]} />
            </GridItem>
          ))
        ) : (
          <Text>No courses available</Text>
        )}
      </Grid>
    </>
  );
}
