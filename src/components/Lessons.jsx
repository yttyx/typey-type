import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Lesson from './Lesson';
import LessonsIndex from './LessonsIndex';
import CustomLessonSetup from './CustomLessonSetup';

const Lessons = ({match, lessonIndex, handleLesson, lesson, ...lessonProps}) => {
  return(
    <div>
      <Switch>
        <Route path={`${match.url}/:category/:subcategory/:lessonPath/flashcards`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/:category/:subcategory/:lessonPath`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/fundamentals/:lessonPath/flashcards`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/fundamentals/:lessonPath`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/drills/:lessonPath/flashcards`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route path={`${match.url}/drills/:lessonPath`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route exact={true} path={`${match.url}/progress/`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route exact={true} path={`${match.url}/progress/seen/`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route exact={true} path={`${match.url}/progress/memorised/`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route exact={true} path={`${match.url}/custom/setup`} render={ (props) =>
          <DocumentTitle title='Typey Type | Create a custom lesson'>
            <CustomLessonSetup
              {...lessonProps}
              {...props}
            />
          </DocumentTitle>
        } />
        <Route exact={true} path={`${match.url}/custom`} render={ (props) =>
          <Lesson lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
      <Route exact={true} path={`${match.url}/flashcards`} render={ (props) =>
          <Lesson
            lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
      <Route exact={true} path={`${match.url}/:notFound`} render={ (props) =>
          <Lesson
            lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
        <Route exact={true} path={match.url} render={ (props) =>
          <LessonsIndex match={match}
            lessonIndex={lessonIndex}
            handleLesson={handleLesson}
            lesson={lesson}
            {...lessonProps}
            {...props}
          />
        } />
      </Switch>
    </div>
  )
};

export default Lessons;
