package com.spring.server.service;

import com.spring.server.model.Comment;
import com.spring.server.model.Like;
import com.spring.server.model.News;
import com.spring.server.model.User;
import com.spring.server.repository.CommentRepository;
import com.spring.server.repository.LikeRepository;
import com.spring.server.repository.NewsRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.CommentDto.CommentAddDto;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import com.spring.server.service.dto.LikeDto.LikeDto;
import com.spring.server.service.dto.NewsDto.NewsAddDto;
import com.spring.server.service.dto.NewsDto.NewsEditDto;
import com.spring.server.service.transformer.CommentTransformer.CommentAddDtoTransformer;
import com.spring.server.service.transformer.CommentTransformer.CommentShowTransformer;
import com.spring.server.service.transformer.LikeTransformer.LikeDtoTransformer;
import com.spring.server.service.transformer.NewsTransformer.NewsAddDtoTransformer;
import com.spring.server.service.transformer.NewsTransformer.NewsEditDtoTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final NewsAddDtoTransformer newsAddDtoTransformer;
    private final NewsEditDtoTransformer newsEditDtoTransformer;
    private final CommentAddDtoTransformer commentAddDtoTransformer;
    private final CommentShowTransformer commentShowTransformer;
    private final LikeDtoTransformer likeDtoTransformer;

    public List<NewsAddDto> getNews() {
        return newsAddDtoTransformer.makeListDto(newsRepository.findAll());
    }

    public void addPost( NewsAddDto newsAddDto) {
        News post = newsAddDtoTransformer.makeModel(newsAddDto);
        post.setPublishDate(LocalDateTime.now().toString());
        this.newsRepository.save(post);
    }

    public List<NewsAddDto> getNewsByIdUser(long id) {
        return  newsAddDtoTransformer.makeListDto(newsRepository.findAllByUser(userRepository.findById(id)));
    }

    public NewsAddDto getPostById(long id) {
        return newsAddDtoTransformer.makeDto(newsRepository.findById(id));
    }

    public void editPost(NewsEditDto newsEditDto) {
        News news = newsEditDtoTransformer.makeModel(newsEditDto);
        news.setPublishDate(LocalDateTime.now().toString());
        newsRepository.save(news);
    }

    public void deletePost(long id) {
        newsRepository.delete(newsRepository.findById(id));
    }

    public void addComment(CommentAddDto commentAddDto) {
        News post = this.newsRepository.findById(commentAddDto.getId_news());
        Set<Comment> comments = new HashSet<>(post.getComments());
        comments.add(this.commentAddDtoTransformer.makeModel(commentAddDto));
        post.setComments(comments);
        this.newsRepository.save(post);
    }

    public Set<CommentShowDto> showComments(long idNews) {
        return commentShowTransformer.makeSetDto(newsRepository.findById(idNews).getComments());
    }

    public void addLike(LikeDto likeDto) {
        Like like = this.likeDtoTransformer.makeModel(likeDto);
        Comment comment = like.getComment();
        User user = like.getUser();
        Set<Like> likes = new HashSet<>(user.getLikes());
        boolean isExist = false;
        Like delLike = new Like();
        for(Like sLike : likes) {
            if(sLike.getUser().getId().equals(user.getId())
                    && sLike.getComment().getId().equals(comment.getId())) {
                delLike = sLike;
                isExist = true;
            }
        }
        if (!isExist) {
            likes.add(like);
        } else {
            likes.remove(delLike);
        }
        comment.setLikes(likes);
        user.setLikes(likes);
        if (delLike.getId() != null) {
            likeRepository.delete(delLike);
        }
        commentRepository.save(comment);
        userRepository.save(user);
    }
}
