import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SendIcon from '@mui/icons-material/Send'
import { Select } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MessageIcon from '@mui/icons-material/Message'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import LabelIcon from '@mui/icons-material/Label'
import Button from '@mui/material/Button'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { AppBar, Toolbar, InputBase } from '@mui/material'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Search from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import TuneIcon from '@mui/icons-material/Tune'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import LoadingButton from '@mui/lab/LoadingButton'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CloseIcon from '@mui/icons-material/Close'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import Dialog from '@mui/material/Dialog'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import ArrowCircleDownSharpIcon from '@mui/icons-material/ArrowCircleDownSharp'
import Drawer from '@mui/material/Drawer'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import StyleIcon from '@mui/icons-material/Style'
import TvIcon from '@mui/icons-material/Tv'
import SettingsIcon from '@mui/icons-material/Settings'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import DialogTitle from '@mui/material/DialogTitle'
import CheckIcon from '@mui/icons-material/Check'
import LogoutIcon from '@mui/icons-material/Logout'
import LinkIcon from '@mui/icons-material/Link'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LinearProgress from '@mui/material/LinearProgress'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Slider from '@mui/material/Slider'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import { purple, blue, pink } from '@mui/material/colors'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import EditNoteIcon from '@mui/icons-material/EditNote'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Collapse from '@mui/material/Collapse'
import { CircularProgress } from '@mui/material'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import { Backdrop } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import DialogActions from '@mui/material/DialogActions'
import Skeleton from '@mui/material/Skeleton'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[2],
    fontSize: 14,
    padding: '7px 10px',
  },
}))

let muiStyles = {
  InputAdornment,
  VisibilityIcon,
  VisibilityOffIcon,
  Skeleton,
  DialogActions,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  Backdrop,
  LightTooltip,
  Alert,
  CircularProgress,
  Collapse,
  EditNoteIcon,
  KeyboardArrowDownIcon,
  Tooltip,
  QuestionMarkIcon,
  pink,
  purple,
  blue,
  ZoomInIcon,
  RotateLeftIcon,
  Slider,
  ContentCopyIcon,
  LinearProgress,
  InfoOutlinedIcon,
  LinkIcon,
  LogoutIcon,
  CheckIcon,
  DialogTitle,
  PollOutlinedIcon,
  SettingsIcon,
  ExpandMoreIcon,
  TvIcon,
  StyleIcon,
  EmojiEmotionsOutlinedIcon,
  Drawer,
  SentimentSatisfiedAltIcon,
  ArrowCircleDownSharpIcon,
  Dialog,
  EditIcon,
  MoreVertIcon,
  ArrowBackOutlinedIcon,
  MoreVertOutlinedIcon,
  ChatBubbleOutlineOutlinedIcon,
  ChatOutlinedIcon,
  MarkUnreadChatAltOutlinedIcon,
  CloseIcon,
  Card,
  HelpOutlineIcon,
  Avatar,
  AccountCircleOutlinedIcon,
  FormGroup,
  Checkbox,
  LoadingButton,
  FormControlLabel,
  Switch,
  Stack,
  Link,
  KeyboardArrowRightIcon,
  TextField,
  ChevronLeftIcon,
  Paper,
  Search,
  Badge,
  MenuItem,
  Menu,
  AccountCircle,
  MailIcon,
  NotificationsIcon,
  MoreIcon,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  InboxIcon,
  DraftsIcon,
  StarBorderIcon,
  AccessTimeIcon,
  SendIcon,
  Select,
  // ExpandMoreIcon,
  ExpandLessIcon,
  ScheduleSendIcon,
  ReportGmailerrorredIcon,
  DeleteOutlineIcon,
  MessageIcon,
  IconButton,
  Typography,
  AddIcon,
  LabelIcon,
  Button,
  CreateOutlinedIcon,
  AppBar,
  Toolbar,
  InputBase,
  MenuIcon,
  SearchIcon,
  TuneIcon,
  HelpOutlineOutlinedIcon,
  SettingsOutlinedIcon,
  AppsOutlinedIcon,
}

export default muiStyles
